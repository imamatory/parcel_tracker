class CreateParcels < ActiveRecord::Migration[5.0]
  def change
    create_table :parcels do |t|
      t.string :track_code
      t.integer :post_status
      t.string :src_addr
      t.string :dest_addr
      t.string :phone
      t.timestamp :added_at

      t.timestamps
    end
  end
end
