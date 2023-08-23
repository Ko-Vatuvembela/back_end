import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'classe_gramaticais';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_classe_gramatical').unsigned().primary(),
        table.string('classe_gramatical', 20);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
