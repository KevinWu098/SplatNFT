# Function to log time and execute command
log_time() {
  local start_time=$(date +%s)
  local description="$1"
  shift
  echo "Starting: $description"
  "$@"
  local end_time=$(date +%s)
  local duration=$((end_time - start_time))
  
  # Log to file
  echo "$(date): $description - ${duration}s" >> timing.txt
}

log_time "Cleanup data directory" rm -rf data
log_time "Cleanup model directory" rm -rf trained_model 
log_time "Create data directory" mkdir -p data
log_time "Create input directory" mkdir -p data/input

log_time "Extract frames from video" ffmpeg -i jas.mp4 -vf fps=2 data/input/frame_%04d.png

log_time "Convert frames" xvfb-run python gaussian-splatting/convert.py -s data

log_time "Train model" xvfb-run python gaussian-splatting/train.py -s data -m trained_model --iterations 60000

log_time "Compress model" tar -czvf trained_model.tar.gz trained_model

log_time "Upload model" curl -F "file=@trained_model.tar.gz" -H "X-API-KEY: 5177b061-1dbe-4790-aaef-996f0593110d" https://file.io