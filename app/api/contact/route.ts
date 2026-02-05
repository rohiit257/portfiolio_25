import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  console.log('=== API Route /api/contact called ===');
  
  try {
    console.log('Parsing request body...');
    const body = await request.json();
    console.log('Received body:', JSON.stringify(body, null, 2));
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      console.error('Validation failed - missing fields:', {
        hasName: !!body.name,
        hasEmail: !!body.email,
        hasMessage: !!body.message
      });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Validation passed ✓');

    // Forward to n8n webhook
    const webhookUrl = 'https://n8n-lhkb.onrender.com/webhook/contact-form';
    console.log('Forwarding to webhook:', webhookUrl);
    
    const payload = {
      name: body.name,
      email: body.email,
      message: body.message,
      timestamp: new Date().toISOString(),
    };
    console.log('Payload:', JSON.stringify(payload, null, 2));
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Webhook response status:', response.status);
    console.log('Webhook response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Webhook error response:', errorText);
      return NextResponse.json(
        { error: 'Failed to send message to webhook', details: errorText },
        { status: 500 }
      );
    }

    let data;
    try {
      data = await response.json();
      console.log('Webhook success response:', JSON.stringify(data, null, 2));
    } catch (e) {
      console.log('Webhook returned non-JSON response (this is OK)');
      data = {};
    }
    
    console.log('=== API Route completed successfully ===');
    return NextResponse.json(
      { success: true, message: 'Message sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('=== API Route ERROR ===');
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Full error:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'N/A');
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
