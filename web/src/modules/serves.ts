export interface IServe {
  CHO: number;
  protien: number;
  fat: number;
  calories: number;
}

const fruitServe: IServe = {
  CHO: 15,
  protien: 0,
  fat: 0,
  calories: 60
};

const legumeServe: IServe = {
  CHO: 15,
  protien: 7,
  fat: 0,
  calories: 110
};

const leanMeatServe: IServe = {
  CHO: 0,
  protien: 7,
  fat: 3,
  calories: 45
};

const mediumMeatServe: IServe = {
  CHO: 0,
  protien: 7,
  fat: 5,
  calories: 75
};

const highMeatServe: IServe = {
  CHO: 0,
  protien: 7,
  fat: 8,
  calories: 100
};

const freeFatMilkServe: IServe = {
  CHO: 15,
  protien: 8,
  fat: 3,
  calories: 100
};

const mediumFatMilkServe: IServe = {
  CHO: 15,
  protien: 8,
  fat: 5,
  calories: 120
};

const highFatMilkServe: IServe = {
  CHO: 15,
  protien: 8,
  fat: 8,
  calories: 150
};

const starchServe: IServe = {
  CHO: 15,
  protien: 3,
  fat: 0,
  calories: 80
};

const vegetableServe: IServe = {
  CHO: 5,
  protien: 2,
  fat: 0,
  calories: 25
};

const sugarServe: IServe = {
  CHO: 15,
  protien: 0,
  fat: 0,
  calories: 60
};

const oilServe: IServe = {
  CHO: 0,
  protien: 0,
  fat: 5,
  calories: 45
};

export default {
  fruitServe,
  vegetableServe,
  leanMeatServe,
  mediumMeatServe,
  highMeatServe,
  freeFatMilkServe,
  mediumFatMilkServe,
  highFatMilkServe,
  starchServe,
  legumeServe,
  sugarServe,
  oilServe
};
