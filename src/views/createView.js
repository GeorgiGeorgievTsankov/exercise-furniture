import { html, render } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";
import { post } from "../api.js";




const root = document.querySelector('.container');

const createViewTemp = (error) => html`
 <div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${submitHandler}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control ${!!error ? error.make ? "is-invalid ": 'is-valid': ""}" id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control ${!!error ? error.model ? "is-invalid ": 'is-valid': ""}" id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control ${!!error ? error.yer ? "is-invalid" : "is-valid": ""}" id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control ${!!error ? error.description ? "is-invalid ": 'is-valid': ""}" id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control ${!!error ? error.price ? "is-invalid ": 'is-valid': ""}" id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control ${!!error ? error.image ? "is-invalid ": 'is-valid': ""}" id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control ${!!error ? error.material ? "is-invalid ": 'is-valid': ""}" id="new-material" type="text" name="material">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>
`

export function createView() {
    render(createViewTemp(), root);
}

async function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const error ={};
    let hasError = false;
    const { make, model, year, description, price, img, material } = Object.fromEntries(formData);

    if (make.length < 4) {
        error.make = true;
        hasError = true;
    }
    if (Number(year) < 1950 || Number(year) > 2050) {
        error.year = true;
        hasError = true;
    }
    if (description.length < 10) {
        error.description = true;
        hasError = true;
    }
    if (Number(price) <= 0) {
        error.price = true;
        hasError = true;
    }
    if (!img) {
        error.img = true;
        hasError = true;
    }
    if(model.length <4){

    }


    if (hasError) {
       return render(createViewTemp(error), root);
    }


    await post("data/catalog", { make, model, year, description, price, img, material });
    page.redirect("/");
}

