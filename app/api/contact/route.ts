import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '이름, 이메일, 내용을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const host = process.env.EMAIL_HOST ?? 'smtp.naver.com';
    const port = Number(process.env.EMAIL_PORT ?? 587);

    if (!user || !pass) {
      return NextResponse.json(
        {
          error:
            '이메일 발송 설정이 완료되지 않았습니다. EMAIL_USER / EMAIL_PASS 환경 변수를 설정해주세요.',
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to: 'ljun925@naver.com',
      subject: `[Portfolio] 새로운 문의 - ${name}`,
      text: `
이름: ${name}
이메일: ${email}

내용:
${message}
      `.trim(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: '이메일 전송 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
