@Controller("*")
class MainController extends ViewController {
    constructor(el) {
        super(el);

        console.log("In main controller", el);
    }
}