import { HrComb } from './hrcomb';
import { HrTagRow } from '../model/hrtagrow';
class HrData {
    selectedTags: [] = [];
    combs: Array<HrComb> = [];
    tagrows: Array<HrTagRow> = [];
    combsBk: Array<HrComb> = [];
}

export = HrData