// Type declarations for Clipboard API
// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
// https://github.com/Microsoft/TypeScript/issues/26728#issuecomment-422970152
interface Clipboard {
  writeText(newClipText: string): Promise<void>
  // Add any other methods you need here.
  readText(): Promise<string>
}

interface NavigatorClipboard {
  // Only available in a secure context.
  readonly clipboard?: Clipboard
}

interface Navigator extends NavigatorClipboard {}
