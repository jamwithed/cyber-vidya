import type { ReactNode } from 'react'

/**
 * Tiny, dependency-free markdown renderer for the lesson content subset we author:
 *   **bold**, `inline code`, `### headings`, and `- ` bullet lists.
 * Renders to React elements (no dangerouslySetInnerHTML) so it is XSS-safe.
 */

function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g
  let last = 0
  let key = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const tok = m[0]
    if (tok.startsWith('**')) {
      out.push(
        <strong key={key++} className="font-semibold text-white">
          {tok.slice(2, -2)}
        </strong>,
      )
    } else {
      out.push(
        <code
          key={key++}
          className="rounded bg-white/10 px-1 py-0.5 font-mono text-[0.85em] text-aqua"
        >
          {tok.slice(1, -1)}
        </code>,
      )
    }
    last = m.index + tok.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

export function Markdown({ body }: { body: string }) {
  const lines = body.split('\n')
  const blocks: ReactNode[] = []
  let list: string[] = []
  let key = 0

  const flushList = () => {
    if (list.length === 0) return
    const items = list
    blocks.push(
      <ul key={key++} className="my-2 space-y-1.5">
        {items.map((li, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-white/75">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-aqua" />
            <span>{renderInline(li)}</span>
          </li>
        ))}
      </ul>,
    )
    list = []
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (line.trim() === '') {
      flushList()
      continue
    }
    if (/^####?\s/.test(line)) {
      flushList()
      const text = line.replace(/^####?\s/, '')
      blocks.push(
        <h4 key={key++} className="mt-3 font-display text-sm font-semibold uppercase tracking-wider text-white/85">
          {renderInline(text)}
        </h4>,
      )
      continue
    }
    if (/^-\s/.test(line)) {
      list.push(line.replace(/^-\s/, ''))
      continue
    }
    flushList()
    blocks.push(
      <p key={key++} className="my-2 text-sm leading-relaxed text-white/75">
        {renderInline(line)}
      </p>,
    )
  }
  flushList()

  return <>{blocks}</>
}
