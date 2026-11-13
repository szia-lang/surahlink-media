import {Config} from '@remotion/cli/config';
// Software WebGL: this cloud container has no GPU
Config.setChromiumOpenGlRenderer('swangle');
Config.setBrowserExecutable('/opt/pw-browsers/chromium');
