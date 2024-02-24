"use client";

import React from "react";
import examplefunction from "./examplefunction.json";

export default function Home() {

  const [query, setQuery] = React.useState("send an email to example@gmail.com about the history of music");
  const [functions, setFunctions] = React.useState(JSON.stringify(examplefunction, null, 2));
  const [viewDetails, setViewDetails] = React.useState(false);
  const [functionCallResponse, setFunctionCallResponse] = React.useState({} as any);
  const [actionDone, setActionDone] = React.useState(false);
  const [actionFailed, setActionFailed] = React.useState(false);
  const [zapierHook, setZapierHook] = React.useState("");

  async function changeValue(v) {
    await setQuery(v.target.value);
    await setFunctionCallResponse({});
    setActionDone(false);
    return query;
  }

  async function changeFunction(v) {
    await setFunctions(v.target.value);
  }

  async function changeZapierWebhook(v) {
    await setZapierHook(v.target.value);
    return zapierHook;
  }

  const handleButtonClick = async () => {
    setActionDone(false);
    try {
      const response = await fetch('/api', {
        method: 'POST',
        body: JSON.stringify({ query: query, functions: functions }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      if (data.choices[0].message.tool_calls) {
        data.choices[0].message.tool_calls[0].function.arguments = JSON.parse(data.choices[0].message.tool_calls[0].function.arguments);
      }

      setFunctionCallResponse(data.choices[0].message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const sendPostRequest = async () => {
    try {
      const response = await fetch('/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ function: functionCallResponse.tool_calls[0].function, zapierHook: zapierHook })
      });
      const data = await response.json();
      console.log('Response from POST request:', data);
      setActionDone(true);
      if (response.status != 200) {
        setActionFailed(true);
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <main >
      <div className="max-w-5xl text-sm p-4 m-auto">
        <p className="text-xs text-blue-300"><a className="underline" target="_blank" href="https://github.com/naklecha/function-calling-playground">Fork this project on Github</a></p>
        <p className="text-lg text-gray-300 mt-1">Function Calling Playground</p>
        <p className="text-sm text-gray-400">Welcome to my function calling playground! Here, you can experiment with function calls and execute actions on Zapier / your custom webhook.</p>


        <div className="mt-5">
          <p className="text-orange-500">Config</p>

          <div className="flex gap-3 mt-1 text-xs">
            <textarea className="bg-orange-100 bg-opacity-10 text-gray-300 p-3 rounded-xl flex-grow border-2 border-orange-600/10" rows={10} onChange={changeFunction} value={functions} />
          </div>
        </div>

        <div className="mt-10">
          <p className="text-orange-500">Execute Query</p>

          <div className="flex gap-3 mt-1">
            <input className="bg-orange-100 bg-opacity-10 text-white p-3 rounded-xl flex-grow border-2 border-orange-600/10" placeholder="Enter the query that you want to execute" onChange={changeValue} value={query} />
          </div>
          <button className="mt-2 bg-orange-600 hover:bg-orange-700 p-2 px-3 rounded-xl text-white text-xs" onClick={handleButtonClick}>Execute Query</button>
          {functionCallResponse.role &&
            <div className="mt-5">
              {functionCallResponse.tool_calls ?
                <div className=" text-white p-4 bg-orange-400 bg-opacity-10 rounded-xl text-sm">
                  <p>Function Name: <span className="text-orange-500">{functionCallResponse.tool_calls[0].function.name}</span></p>
                  <p>Function Arguments:</p>

                  {Object.entries(functionCallResponse.tool_calls[0].function.arguments).map((value, index) => {
                    return <p className="text-gray-300">{index + 1}. {value[0]}: <span className="text-orange-500">{value[1] as string}</span></p>
                  })}


                  {zapierHook ? (
                    !actionDone ?
                      <button className="mt-5 bg-orange-600 hover:bg-orange-700 p-2 px-3 rounded-xl text-white text-xs" onClick={sendPostRequest}>Confirm and perform action</button>
                      :
                      actionFailed ?
                        <p className="mt-4 w-fit rounded text-red-300">Action did not work! Something went wrong, check the logs.</p> :
                        <p className="mt-4 w-fit rounded text-blue-300">Action has been performed!</p>
                  ) :
                    (
                      <p className="mt-4 text-blue-400">To perform an action, create your Zapier webhook by following the optional setup provided below.</p>
                    )
                  }

                </div>
                :
                <div className="p-3 bg-orange-700/60 mt-3 text-orange-100 rounded-xl">{functionCallResponse.content}</div>
              }
              <div className="mt-2">
                <p className="text-orange-500  text-xs cursor-pointer select-none" onClick={() => setViewDetails(!viewDetails)}>{viewDetails ? "hide" : "show"} function call details</p>
                {
                  viewDetails &&
                  <div className="bg-orange-400 bg-opacity-10 mt-1 text-white text-xs break-all p-3 rounded-xl">
                    {JSON.stringify(functionCallResponse, null, 2)}
                  </div>
                }
              </div>
            </div>
          }
        </div>

        <div className="w-full mt-10 text-sm text-white">
          <p className="text-orange-500">Additional Setup (optional)</p>
          <input className="mt-2 bg-orange-100 bg-opacity-10 text-white p-3 rounded-xl border-2 border-orange-600/10 w-full" placeholder="https://hooks.zapier.com/hooks/catch/XXXXXXXX/XXXXXX" onChange={changeZapierWebhook} />
          <div className="text-sm text-gray-400 mt-4">
            {/* <p><a className="underline text-blue-100 cursor-pointer" href="https://zapier.com/" target="_blank">Watch this setup tutorial</a></p>
            <p className="my-3 text-xs">or follow the following steps</p> */}

            <p>1. Zapier a powerful tool for automating tasks and integrating different systems.</p>
            <p>2. In this setup, we will configure a Zapier webhook to automate actions in response to certain events.</p>
            <p>3. Start by <a className="underline text-blue-300" href="https://zapier.com/" target="_blank">creating a Zapier account</a> if you don't have one already.</p>
            <p>4. Set up a new Zap in Zapier.</p>
            <p>5. Add a new action step and search for "Webhooks by Zapier".</p>
            <p>6. Select "Webhooks by Zapier" as the action app and choose the desired action to perform.</p>
            <p>7. Configure the action step settings, including any required parameters or data.</p>
            <p>8. In the webhook URL field on the website, enter the URL provided by Zapier for your webhook.</p>
            <p>9. At the end your Zap should look something like this: <a target="_blank" href="/zapier.png" className="underline text-blue-300">example Zapier workflow</a></p>
          </div>
        </div>

        <p className="mt-20 mb-10 text-gray-300 text-xs text-center">Powered By <a className="underline" href="https://fireworks.ai/">Fireworks.ai</a></p>
      </div>
    </main>
  );
}
