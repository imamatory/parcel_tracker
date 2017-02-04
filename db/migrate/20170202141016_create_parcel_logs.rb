class CreateParcelLogs < ActiveRecord::Migration[5.0]
  def change
    create_table :parcel_logs do |t|
      t.references :parcel, foreign_key: true
      t.integer :post_status
      t.text :msg

      t.timestamps
    end
  end
end
