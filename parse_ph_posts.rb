require 'highscore'
require 'bloomfilter-rb'
require 'json'
require 'treat'
require 'pry'

json = JSON.parse File.new("./outputs/2015_ph_posts.json", 'r').read

processed = json.values.flatten.map { |post|
  "#{post['name']}: #{post['tagline']}"
}.join("\n")

File.new("./outputs/2015_ph_posts_name_and_tagline.txt", 'w').write processed

blacklist = Highscore::Blacklist.load %w(
  way etc fun tool right show stuff stand push beta page action)
text = Highscore::Content.new processed, blacklist
text.configure do
  set :word_pattern, /[a-zA-Z][\w]+/
  set :ignore_case, true
end

output = File.new("./outputs/keywords.js", 'w')
keywords = text.keywords.top(3000)

# Only nouns are cousidered.
whitelist = %w(
  gif resume curated)
keywords = keywords.select do |k|
  k.text.category == 'noun' || whitelist.include?(k.text)
end

# Combine plural & singular nouns.
keywords.delete_if do |k|
  if k.text != k.text.singular
    if s = keywords.detect { |dup| dup.text == k.text.singular }
      s.weight = s.weight + k.weight
      true
    else
      k.text = k.text.singular
    end
  end
end

keywords = keywords.map do |k|
  {
    text: k.text,
    size: 10 + (k.weight / keywords[0].weight) * 90
  }
end
output.write "var keywords = #{keywords.to_json}"
output.close

p "#{keywords.size} ketwords"
