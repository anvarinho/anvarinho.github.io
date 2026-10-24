//! Developer-only asset generation; the website itself has no build step.
use std::{error::Error, fs, process::Command};

fn render(source: &str, target: &str, size: u32, opaque: bool) -> Result<(), Box<dyn Error>> {
    let mut command = Command::new("rsvg-convert");
    command.args(["--width", &size.to_string(), "--height", &size.to_string()]);
    if opaque {
        command.args(["--background-color", "#080e16"]);
    }
    let result = command.args(["--output", target, source]).status()?;
    if !result.success() {
        return Err(format!("SVG rendering failed: {target}").into());
    }
    println!("{target}: {size} × {size}");
    Ok(())
}

fn main() -> Result<(), Box<dyn Error>> {
    let source = fs::read_to_string("favicon.svg")?;
    if !source.trim_start().starts_with("<svg ") {
        return Err("Run from the repository root with favicon.svg present".into());
    }
    fs::create_dir_all("assets/icons")?;
    // Keep the complete mark inside a circle of radius 40% of the canvas.
    let inset = source.replacen(
        "<svg ",
        "<svg x=\"12\" y=\"12\" width=\"40\" height=\"40\" ",
        1,
    );
    fs::write(
        "assets/icons/maskable.svg",
        format!("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><rect width=\"64\" height=\"64\" fill=\"#080e16\"/>{inset}</svg>\n"),
    )?;

    for size in [16, 32, 48] {
        render(
            "favicon.svg",
            &format!("assets/icons/favicon-{size}.png"),
            size,
            false,
        )?;
    }
    render("favicon.svg", "favicon.png", 96, false)?;
    render("favicon.svg", "apple-touch-icon.png", 180, true)?;
    for size in [152, 167] {
        render(
            "favicon.svg",
            &format!("assets/icons/apple-touch-icon-{size}.png"),
            size,
            true,
        )?;
    }
    for size in [192, 512] {
        render(
            "favicon.svg",
            &format!("assets/icons/app-{size}.png"),
            size,
            true,
        )?;
        render(
            "assets/icons/maskable.svg",
            &format!("assets/icons/maskable-{size}.png"),
            size,
            true,
        )?;
    }
    let result = Command::new("magick")
        .args([
            "assets/icons/favicon-16.png",
            "assets/icons/favicon-32.png",
            "assets/icons/favicon-48.png",
            "favicon.ico",
        ])
        .status()?;
    if !result.success() {
        return Err("ICO generation failed; ImageMagick is required".into());
    }
    println!("favicon.ico: 16, 32, and 48 pixel frames");
    Ok(())
}
