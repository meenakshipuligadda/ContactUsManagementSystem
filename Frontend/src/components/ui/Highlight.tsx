import "./Highlight.css";

interface HighlightProps {
  text: string;
  /** Pre-built matcher, memoised by the parent so it isn't rebuilt per row. */
  matcher: RegExp | null;
}

/**
 * Wraps the parts of `text` that match `matcher` in a <mark>.
 *
 * String.split() with a *capturing* regex puts the captured matches at the
 * odd indices of the resulting array, so we can rebuild the string with
 * every second chunk highlighted. This avoids calling matcher.test() in a
 * loop, which would be unreliable: a /g/ regex carries lastIndex state
 * between calls.
 */
function Highlight({ text, matcher }: HighlightProps) {
  if (!matcher) return <>{text}</>;

  const parts = text.split(matcher);

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="highlight">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default Highlight;
