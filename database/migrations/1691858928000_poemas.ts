import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'poemas';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_poema').unsigned().primary();
      table.text('poema');
      table.text('explicacao');
      table.date('data');
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
