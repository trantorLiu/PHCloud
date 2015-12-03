require 'rest-client'
require "awesome_print"

TOKEN = "028fd6ccbe94934ab78a385d5ac10702b13b0419ab33be2c5525d3655ea16bcc"

result = {}

date = Date.new 2015, 1, 1

while date < Date.new(2016, 1, 1)
  response = RestClient.get 'https://api.producthunt.com/v1/categories/tech/posts', {
    :params => {
      day: date
    },
    :Authorization => 'Bearer 028fd6ccbe94934ab78a385d5ac10702b13b0419ab33be2c5525d3655ea16bcc'
  }

  json = JSON.parse response.to_str

  result[date] = json['posts']

  # Write to file.
  output = File.new("./outputs/2015_ph_posts.json", 'w')
  output.write(result.to_json)
  output.close

  puts date

  date = date + 1
end