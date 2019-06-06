export class Hero {
    static WIZARD = 'wizard';
    static GRUNT = 'grunt';
    static WICK = 'wick';
    static ROCKY = 'rocky';
    static WIZARDHP = 200;
    static GRUNTHP = 500;
    static WICKHP = 300;
    static ROCKYHP = 600;
    maxHP: number;
    currentHP: number;
    attack: number;
    name: string;
    heroType: string;

    constructor(maxHP, name, type) {
        this.maxHP = maxHP;
        this.currentHP = maxHP;
        this.name = name;
        this.heroType = type;
    }
}
