module CamelJson
  def camelize_keys(hash)
    values = hash.map do |key, value|
      [key.to_s.camelize(:lower), value]
    end
    Hash[values]
  end
end
