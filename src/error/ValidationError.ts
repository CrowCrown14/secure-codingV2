export class ValidationError extends Error {
   
    private target: object;
    private property: string;

    constructor(message: string, target: object, property: string) {
        super(message);
        this.target = target;
        this.property = property;
    }

}