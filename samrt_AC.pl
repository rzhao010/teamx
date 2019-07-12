#!/usr/bin/perl
################################################################################################################
#
#               smart_AC.pl
#
################################################################################################################
#Descrption:
#	This script will be a prototype for our smart AC data processing unit;
#It will pull humidity and temperature data from the cloud, weather forecast from the Internet,
#and people count from IBM AI watson platform. Based on given information, it will send command to
#smart AC to set temperature to an ideal level.
#
################################################################################################################
#  When:     Who:     What:
#---------------------------------------------
# 07-11-19   kcf        Initial Version
################################################################################################################
use strict;
use warnings;
use Data::Dumper;

################################################################################################################
#Pulling humidity and temperature data from the cloud, weather forecast from the Internet,
#and people count from IBM AI watson platform


#Getting data from the cloud 
my $filename = 'smart_AC_temp.json';
open my $fh, '<', $filename or die "Could not open '$filename' $!\n";
my @cloud_data;
my @temp_data;
my @humidity_data;
my $temp_sum;
my $humidity_sum; 
while ( my $line = <$fh> ) {
    chomp $line;
    push @cloud_data, $line;
}

foreach(@cloud_data){
	if ($_ =~ m/"trmp"=(\d+)/i) {
		my $temperature = $1; 
		$temp_sum += $temperature;
		push @temp_data, $temperature; 
	}
	if ($_ =~ m/"humidity":(\d+)/i) {
		my $humidity = $1; 
		$humidity_sum += $humidity; 
		push @humidity_data, $humidity; 	
	}
}

#Find average temperature and humidity level within a room for a period of 10~15mins 
my $temp_avg  = $temp_sum / scalar (@temp_data); 
my $humidity_avg  = $humidity_sum / scalar (@humidity_data); 



#Getting number count of person by running a python script on IBM Watson AI platform 
my $person_count = `number_count.py`; 


#Pulling temperature and humidity level forecast in next 3~4 hrs from the Internet 
my $temperature_forecast = "number";
my $humidity_forecast = "number";



################################################################################################################
#Calculate ideal temperature
#Based on previous conducted experiment with controlled variables (person count, current_temperature, current_humidity, humidity_forecast, temperature_forecast) 
#to find the best algorithm to calculate ideal room temperature 






################################################################################################################
#Send temperature cmd to AC control unit through IOT network
#


#Interact with network protocols 

#Receive feedback from AC control unit and output msg to control log file with a time stamp
my $control_log_name = 'log.txt';
open(my $fh, '>', $contro_log_name) or die "Could not open file '$contro_log_name' $!";
print $fh "FEEDBACK MSG-SET TEMPERATURE" . localtime();
close $fh;



