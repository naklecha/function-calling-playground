import { NextResponse } from 'next/server'

const sendPostRequest = async (req) => {
  try {
    const response = await fetch(req.zapierHook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.function)
    });
    const data = await response.json();
    console.log('Response from POST request:', data);
    return true;
  } catch (error) {
    console.error('Error sending POST request:', error);
    return false;
  }
};


export async function POST(request: Request) {
  const req = await request.json();
  const success = await sendPostRequest(req);
  return NextResponse.json({}, { status: success?200:500 });
}
