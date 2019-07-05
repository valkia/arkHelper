class ArkResp {
  status:number;
  data:any;
  errMsg:string

  constructor( status: number, data: string, errMsg: string) {
    this.status = status;
    this.data = data;
    this.errMsg = errMsg;
  }
}


export = ArkResp;