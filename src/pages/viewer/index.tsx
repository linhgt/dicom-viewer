import styles from './styles.module.css';
import { useEffect, useRef, useState } from 'preact/hooks';
import dcmjs from 'dcmjs';
import { Canvas } from '../../components/Canvas';
import { Overlay } from '../../components/Overlay';
import { Viewport } from '../../components/Viewport';

let decoderInitialization: Promise<void> | undefined;

async function loadDicomImaging() {
  const imaging = await import('dcmjs-imaging');

  if (!imaging.NativePixelDecoder.isInitialized()) {
    decoderInitialization ??= imaging.NativePixelDecoder.initializeAsync();
    await decoderInitialization;
  }

  return imaging;
}

export default function ViewerPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     const gl2 = canvasRef.current.getContext('webgl2');
  //     if (!gl2) {
  //       throw new Error("Webgl2 doesn't exist");
  //     } else {
  //       gl2.SHADER_TYPE;
  //       const vertexShaderSource = `#version 300 es

  //         // an attribute is an input (in) to a vertex shader.
  //         // It will receive data from a buffer
  //         in vec4 a_position;

  //         // all shaders have a main function
  //         void main() {

  //           // gl_Position is a special variable a vertex shader
  //           // is responsible for setting
  //           gl_Position = a_position;
  //         }
  //         `;

  //       const fragmentShaderSource = `#version 300 es

  //         // fragment shaders don't have a default precision so we need
  //         // to pick one. highp is a good default. It means "high precision"
  //         precision highp float;

  //         // we need to declare an output for the fragment shader
  //         out vec4 outColor;

  //         void main() {
  //           // Just set the output to a constant reddish-purple
  //           outColor = vec4(1, 0, 0.5, 1);
  //         }
  //         `;

  //       function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  //         const shader = gl.createShader(type);
  //         gl.shaderSource(shader!, source);
  //         gl.compileShader(shader!);
  //         var success = gl.getShaderParameter(shader!, gl.COMPILE_STATUS);
  //         if (success) {
  //           return shader;
  //         }

  //         console.log(gl.getShaderInfoLog(!shader));
  //         gl.deleteShader(shader);
  //       }

  //       function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  //         var program = gl.createProgram();
  //         gl.attachShader(program, vertexShader);
  //         gl.attachShader(program, fragmentShader);
  //         gl.linkProgram(program);
  //         var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  //         if (success) {
  //           return program;
  //         }

  //         console.log(gl.getProgramInfoLog(program));
  //         gl.deleteProgram(program);
  //       }

  //       const vertextShader = createShader(gl2, gl2.VERTEX_SHADER, vertexShaderSource);
  //       const fragmentShader = createShader(gl2, gl2.FRAGMENT_SHADER, fragmentShaderSource);

  //       const program = createProgram(gl2, vertextShader!, fragmentShader!);
  //     }
  //   }
  // }, []);

  return (
    <div className={styles.viewerPage}>
      <header className={styles.viewerHeader}>
        <div>
          <p className={styles.eyebrow}>DICOM workspace</p>
          <h1>Medical Viewer</h1>
        </div>
      </header>

      <div className={styles.viewerWorkspace}>
        <aside className={styles.seriesPanel} aria-labelledby='series-heading'>
          <div className={styles.panelHeader}>
            <h2 id='series-heading'>Series</h2>
            <span className={styles.seriesCount}>0</span>
          </div>

          <div className={styles.emptySeries}>
            <button
              onClick={() => {
                if (!inputRef.current) {
                  return;
                }

                inputRef.current.click();
              }}
            >
              Upload Files
            </button>
            <input
              style={{ display: 'none' }}
              ref={inputRef}
              type='file'
              multiple
              onChange={(event) => {
                const files = Array.from(event.currentTarget.files ?? []);

                for (const file of files) {
                  const reader = new FileReader();
                  reader.onloadend = async (evt) => {
                    if (!(evt.target?.result instanceof ArrayBuffer)) {
                      return;
                    }

                    try {
                      const { DicomImage } = await loadDicomImaging();
                      const image = new DicomImage(evt.target.result);
                      const renderedResult = image.render();

                      if (canvasRef.current) {
                        const ctx = canvasRef.current.getContext('2d');
                        if (ctx) {
                          canvasRef.current.width = renderedResult.width;
                          canvasRef.current.height = renderedResult.height;

                          const imageData = ctx.createImageData(renderedResult.width, renderedResult.height);
                          const renderedPixels = new Uint8ClampedArray(renderedResult.pixels);
                          imageData.data.set(renderedPixels);
                          ctx.putImageData(imageData, 0, 0);
                        }
                      }
                    } catch (error) {
                      console.error('Failed to load DICOM image', error);
                    }
                  };

                  reader.readAsArrayBuffer(file);
                }
              }}
            ></input>
            <p>No series loaded</p>
            <span>Series will appear here.</span>
          </div>
        </aside>

        <main className={styles.mainContent}>
          <section className={styles.viewerSurface} aria-label='Image viewport'>
            <Viewport>
              <Canvas canvasRef={canvasRef} />
              <Overlay>
                <Overlay.TopLeftCorner />
                <Overlay.TopRightCorner />
                <Overlay.BottomLeftCorner />
                <Overlay.BottomRightCorner />
              </Overlay>
            </Viewport>
          </section>
        </main>
      </div>
    </div>
  );
}
