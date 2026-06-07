package com.example.attendance.controller;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.common.BitMatrix;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;

@RestController
@RequestMapping("/api/qr")
public class QRController {

    @GetMapping("/generate")
    public void generateQR(
            @RequestParam String text,
            HttpServletResponse response
    ) throws WriterException, IOException {

        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(
                text,
                BarcodeFormat.QR_CODE,
                200,
                200
        );

        BufferedImage image = new BufferedImage(
                200,
                200,
                BufferedImage.TYPE_INT_RGB
        );

        for (int x = 0; x < 200; x++) {
            for (int y = 0; y < 200; y++) {
                image.setRGB(x, y,
                        bitMatrix.get(x, y) ? 0xFF000000 : 0xFFFFFFFF
                );
            }
        }

        response.setContentType("image/png");
        ImageIO.write(image, "PNG", response.getOutputStream());
    }
}
