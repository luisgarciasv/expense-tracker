// import { dbOperationsMixin, testArgsMixin} from "../helpers.js";
import { ListExpense } from './list.js';

class SummaryExpense extends ListExpense {
    constructor(args) {
        super(args);
    }
}

export { SummaryExpense };
