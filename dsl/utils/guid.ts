class Guid {

    private static S4() : string {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }

    public static CreateGUID() : string {
        return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
    }
}

