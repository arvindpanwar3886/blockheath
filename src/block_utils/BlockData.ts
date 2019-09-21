import FileFields from "./FileDataInterface";

export default class BlockData {
  //this is a JSON string
  file_data_json: string;

  constructor(fileData: string) {
    this.file_data_json = fileData;
  }

  destructureJSON(): FileFields {
    return <FileFields>JSON.parse(this.file_data_json);
  }
}
