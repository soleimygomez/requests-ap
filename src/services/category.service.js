//logica del negocio
const faker = require('faker');
const boom=require('@hapi/boom');

class CategorysService {
  constructor() {
    this.category = [];
    this.generate();
  }

  generate(quantity = 100) {
    for (let i = 0; i < quantity; i++) {
      this.category.push({
        id: i + 1,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

  async create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.category.push(newCategory);
    return newCategory;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.category);
      }, 5000);
    });
  }

  async findOne(id) {
    const category= this.category.find((p) => (p.id = id));
    if(!category){
        throw boom.notFound("Products not found");
    }
    return category;
  }

  async update(id, changes) {
    const index = this.category.findIndex((p) => (p.id = id));
    if (index === -1) {
      throw boom.notFound("Products not found");
    }
    const category = this.category[index];
    this.category[index] = {
      // que me modifique pero sin borrarme los que ya tenia
      ...category,
      ...changes,
    };
    return this.category[index];
  }

  async delete(id) {
    const index = this.category.findIndex((p) => (p.id = id));
    if (index === -1) {
        throw boom.notFound("Products not found");
    }
    this.category.splice(index, 1);
    return { id };
  }
}

module.exports = CategorysService;
