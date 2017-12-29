@Controller("/store")
class StoreController extends ViewController {
    constructor(el, router) {
        super(el);

        console.log('In store controller', router);
    }
}