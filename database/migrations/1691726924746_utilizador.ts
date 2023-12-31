import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'utilizadores';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('uid').unsigned().primary();
      table.string('nome', 45),
        table.boolean('ativada').defaultTo(false),
        table.string('sobrenome', 45),
        table.string('email', 45),
        table.string('foto', 255),
        table.string('password', 255);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
