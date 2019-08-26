import { MaterialItemData } from './materialitemdata';
 class MaterialItem {
  id: string = "";
  name: string = "";
  rarity: number = 0;
  source: any;
  madeof: any;
  icon: string = "";
  data: MaterialItemData = new MaterialItemData("");
}

export = MaterialItem