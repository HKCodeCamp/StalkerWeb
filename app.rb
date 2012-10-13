require 'json'
require 'sinatra'
require "sinatra/reloader" if development?
require "sinatra/content_for"

set :root, File.dirname(__FILE__)
set :static, true
set :views, settings.root + '/views'

get '/' do
  @title = "currently stalked..."
  erb :index, :layout => :layout
end

get '/search' do
  @title = "find a target..."
  erb :search, :layout => :layout
end

get '/detail' do
  @title = "~CELEB NAME~"
  erb :detail, :layout => :layout
end

post '/bad' do
  content_type :json
   halt(500, { :type => 'EmailTaken'}.to_json)
  
end 

get '/profile' do
  @title = "my profile "
  erb :profile, :layout => :layout
end

get '/stalk' do
  @title = "found a target..."
  erb :stalk, :layout => :layout
end

get '/login' do
  @title = "login to stalk"
  erb :login, :layout => :layout
end

get '/register' do
  @title = "register to stalk"
  erb :register, :layout => :layout
end

post '/api/login' do
  content_type :json
  data = JSON.parse(request.body.read)
  { 
    :user_id => 1234, 
    :username => data['username']
    }.to_json
end