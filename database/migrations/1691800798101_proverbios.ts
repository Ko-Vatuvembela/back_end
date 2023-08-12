import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'proverbios';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id_proverbio', 64).primary();
      table.text('proverbio');
      table.text('explicacao');
      table.date('data');
      table.string('utilizador_fk', 64);
      table.string('lingua_fk', 64);
      table
        .foreign('utilizador_fk')
        .references('utilizadores.username')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .foreign('lingua_fk')
        .references('linguas.id_lingua')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
