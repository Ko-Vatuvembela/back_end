import BaseSchema from '@ioc:Adonis/Lucid/Schema';
export default class extends BaseSchema {
  protected tableName = 'proverbios';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_proverbio').unsigned().primary();
      table.text('proverbio');
      table.text('explicacao');
      table.string('data', 15);
      table
        .integer('utilizador_fk')
        .unsigned()
        .references('utilizadores.uid')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .integer('lingua_fk')
        .unsigned()
        .references('linguas.id_lingua')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
