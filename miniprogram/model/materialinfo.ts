class MaterialInfo {
    id: string = "";
  name: string = "";
  rarity: number = 0;
    source: {
        [key:string]:string
    } = {};
    madeof: {
        [key:string]:number
    } = {};
    icon: string = "";
}

export = MaterialInfo