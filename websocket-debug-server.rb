require 'rubygems'
require 'em-websocket'

port = 10007
port = ARGV.first.to_i if ARGV.size > 0

EM::run do

  puts "server start - port:#{port}"
  @channel = EM::Channel.new

  EM::WebSocket.start(:host => "0.0.0.0", :port => port) do |ws|
    ws.onopen{
      sid = @channel.subscribe{|mes|
        ws.send(mes)
      }
      puts "<#{sid}> connected!!"
      @channel.push("hello <#{sid}>")

      ws.onmessage{|mes|
        puts "<#{sid}> #{mes}"
        @channel.push("<#{sid}> #{mes}")
      }

      ws.onclose{
        puts "<#{sid}> disconnected"
        @channel.unsubscribe(sid)
        @channel.push("<#{sid}> disconnected")
      }
    }
  end

  EM::defer do
    loop do
      @channel.push STDIN.gets.strip
    end
  end
end
