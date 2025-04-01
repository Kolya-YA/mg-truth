class HtmlError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = 'HtmlError';
  }
}

export { HtmlError };