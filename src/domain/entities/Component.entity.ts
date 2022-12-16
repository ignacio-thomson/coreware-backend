import mongoose from "mongoose";
import { IComponent } from "../interfaces/IComponent.intefarce";

export const componentEntity = () => {

    let componentSchema = new mongoose.Schema<IComponent>(
        {
            brand: {type: String, required: true},
            model: {type: String, required: true},
            price: {type: Number, required: true}
        }
    );

    return mongoose.models.Components || mongoose.model<IComponent>('Components', componentSchema, 'components');

}

