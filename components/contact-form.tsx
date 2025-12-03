'use client';

import { useState, type FormEvent } from 'react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error || '메시지 전송에 실패했습니다.');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : '메시지 전송 중 알 수 없는 오류가 발생했습니다.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      <div className="space-y-1">
        <label
          htmlFor="name"
          className="block text-xs font-medium text-muted-foreground"
        >
          이름
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-0 placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/30"
          placeholder="이름을 입력해주세요."
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="email"
          className="block text-xs font-medium text-muted-foreground"
        >
          이메일
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-0 placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/30"
          placeholder="연락 가능한 이메일을 입력해주세요."
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="message"
          className="block text-xs font-medium text-muted-foreground"
        >
          전달할 내용
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-0 placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/30"
          placeholder="어떤 이야기든 편하게 남겨주세요."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? '보내는 중...' : '보내기'}
      </button>

      {status === 'success' && (
        <p className="text-xs text-emerald-600">
          메시지가 성공적으로 전송되었습니다. 빠르게 확인해 보겠습니다.
        </p>
      )}
      {status === 'error' && (
        <p className="text-xs text-destructive">{errorMessage}</p>
      )}
    </form>
  );
}
