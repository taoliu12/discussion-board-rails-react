class RemoveTitleFromComments < ActiveRecord::Migration[7.0]
  def change
    remove_column :comments, :title, :string
  end
end
