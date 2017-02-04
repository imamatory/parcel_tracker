class CreateParcels < ActiveRecord::Migration[5.0]
  def change
    create_table :parcels do |t|
      t.string :track_code
      t.integer :post_status, default: 0
      t.string :src_addr
      t.string :dest_addr
      t.decimal :phone, precision: 15, scale: 0

      t.timestamps
    end

    add_index :parcels, :track_code, unique: true
  end
end
