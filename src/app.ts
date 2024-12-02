import express, { Application, Request, Response, NextFunction } from "express"
import cors from 'cors'
//import router from "./app/routes";
//import globalErrorHandler from "./app/middlewares/globalErrorHandaler";

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    // console.log()
    res.send({
        Message: "E-commers server runing..."
    })
})

//app.use('/api/v1', router);


//app.use(globalErrorHandler)

app.use(( req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: 'API not found'
        
    })
})



export default app