exports.up = function(knex, Promise) {
    return knex.schema
    .createTableIfNotExists('products', function(table) {
        table
            .uuid('id')
            .defaultTo(knex.raw('uuid_generate_v4()'))
            .primary();
        table
            .string('title')
            .notNullable()
            .unique();
        table
            .decimal('price',14,2)
            .notNullable();
        table
            .integer('inventory_count',14,2)
            .notNullable()
            .unsigned();
        table
            .timestamp('created_at')
            .notNullable()
            .defaultTo(knex.fn.now());
      })
      .raw(
        // add update_row_modified_function_()
        `CREATE OR REPLACE FUNCTION update_row_modified_function_()
            RETURNS TRIGGER
            AS
            $$
            BEGIN
            NEW.updated_at = now();
            RETURN NEW;
            END;
            $$
            language 'plpgsql';
            `,
      )
        .raw(
        // add updated_at trigger
        `CREATE TRIGGER row_mod_on_set_slots_trigger_
            BEFORE UPDATE
            ON products
            FOR EACH ROW
            EXECUTE PROCEDURE update_row_modified_function_();
            `,
        );
  
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('products')
};
