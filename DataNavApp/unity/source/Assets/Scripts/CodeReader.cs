using Unity.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;
using TMPro;
using ZXing;

public class CodeReader : MonoBehaviour
{

    [SerializeField]
    private ARSession session;
    [SerializeField]
    private ARSessionOrigin sessionOrigin;
    [SerializeField]
    private ARCameraManager cameraManager;
    [SerializeField]
    private TextMeshProUGUI TMPresultText;
    [SerializeField]
    private string strLastResult;
    [SerializeField]
    private float nextActionTime = 0.0f;
    [SerializeField]
    private float period = 0.25f; // correspond to 4 frames per second

    private Texture2D t2dCameraImageTexture;

    private IBarcodeReader barcodeReader = new BarcodeReader
    {
        AutoRotate = false,
        Options = new ZXing.Common.DecodingOptions
        {
            TryHarder = false,
            PossibleFormats = new List<BarcodeFormat>
            {
                BarcodeFormat.QR_CODE,
                BarcodeFormat.DATA_MATRIX
            }
        }
    };

    private Result result;

    private void OnEnable()
    {
        cameraManager.frameReceived += OnCameraFrameReceived;
    }

    private void OnDisable()
    {
        cameraManager.frameReceived -= OnCameraFrameReceived;
    }

    private void OnCameraFrameReceived(ARCameraFrameEventArgs eventArgs)
    {
        // Skip frames to only process 4 per second
        if (Time.time < nextActionTime)
        {
            return;
        }
        nextActionTime = Time.time + period;

        if (!cameraManager.TryAcquireLatestCpuImage(out XRCpuImage image))
        {
            return;
        }

        var conversionParams = new XRCpuImage.ConversionParams
        {
            // Get the entire image.
            inputRect = new RectInt(0, 0, image.width, image.height),

            // Downsample by 2.
            outputDimensions = new Vector2Int(image.width / 2, image.height / 2),

            outputFormat = TextureFormat.RGBA32,

            // Flip across the vertical axis (mirror image).
            transformation = XRCpuImage.Transformation.MirrorY
        };

        // See how many bytes you need to store the final image.
        int size = image.GetConvertedDataSize(conversionParams);

        // Allocate a buffer to store the image.
        var buffer = new NativeArray<byte>(size, Allocator.Temp);

        // Extract the image data
        image.Convert(conversionParams, buffer);

        image.Dispose();

        t2dCameraImageTexture = new Texture2D(
            conversionParams.outputDimensions.x,
            conversionParams.outputDimensions.y,
            conversionParams.outputFormat,
            false);

        t2dCameraImageTexture.LoadRawTextureData(buffer);
        t2dCameraImageTexture.Apply();

        buffer.Dispose();

        // Detect and decode the barcode inside the bitmap
        result = barcodeReader.Decode(t2dCameraImageTexture.GetPixels32(), t2dCameraImageTexture.width, t2dCameraImageTexture.height);

        if (result != null)
        {
            TMPresultText.text = result.Text;
        }
    }
}
