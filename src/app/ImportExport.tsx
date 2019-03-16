import * as React from 'react';
import { CardStacks } from 'app';
import { CancelDialog } from 'app/CancelDialog';

interface ImportExportProps extends CancelDialog {
  stacks: CardStacks,
  import: (text: string) => void,
}

interface ImportExportState {
  stateAsJsonString: string;
}

export class ImportExport extends React.Component<ImportExportProps, ImportExportState> {
  static supportForCopyToClipboard(): boolean {
    const maybeClipboard = navigator.clipboard;
    return maybeClipboard != undefined && (typeof maybeClipboard.readText === "function");
  }

  static supportForImportFromClipboard(): boolean {
    const maybeClipboard = navigator.clipboard;
    return maybeClipboard != undefined && (typeof maybeClipboard.writeText === "function");
  }

  constructor(props: ImportExportProps) {
    super(props);
    this.importClicked = this.importClicked.bind(this);
    this.stacksToJsonString = this.stacksToJsonString.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.importFromClipboard = this.importFromClipboard.bind(this);
    this.state = { stateAsJsonString: '' };
  }

  importClicked() {
    this.props.import(this.state.stateAsJsonString)
  }

  stacksToJsonString() {
    return JSON.stringify(this.props.stacks, null, 2)
  }

  copyToClipboard() {
    navigator.clipboard!.writeText(this.stacksToJsonString())
      .then(() => console.log("copied to clipboard"))
      .catch((error) => alert(error));
  }

  importFromClipboard() {
    navigator.clipboard!.readText().then(this.props.import);
  }

  onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ stateAsJsonString: e.target.value })
  };

  render() {
    return <React.Fragment>
      <h2 key="h2">Import / Export</h2>
      <textarea
        key="textarea" rows={20} cols={20}
        defaultValue={this.stacksToJsonString()}
        onChange={this.onTextChange}
      />
      <button key="to-clipboard" hidden={!ImportExport.supportForCopyToClipboard()} type="submit" onClick={this.copyToClipboard}>Copy to Clipboard</button>
      <button key="from-clipboard" hidden={!ImportExport.supportForImportFromClipboard()} type="submit" onClick={this.importFromClipboard}>Import from Clipboard</button>
      <button key="import" type="submit" onClick={this.importClicked}>{"Import"}</button>
      <button key="cancel" type="submit" onClick={this.props.cancel}>{"Cancel"}</button>
    </React.Fragment>;
  }
}
