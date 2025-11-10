{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
    pkgs.git
    pkgs.cacert
    pkgs.ffmpeg
  ];

  env = {
    NODE_ENV = "production";
    LANG = "en_US.UTF-8";
  };

  packages = with pkgs; [
    nodePackages.npm
    nodePackages.yarn
  ];

  shellHook = ''
    echo "✦━━━━━━━━━━━━━━━━━━━━━✦"
    echo "✨ 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑴𝒊𝒓𝒂𝒊 𝑩𝒐𝒕 💫"
    echo "⚡ Environment: Replit"
    echo "🚀 Node.js Version: $(node -v)"
    echo "✦━━━━━━━━━━━━━━━━━━━━━✦"
  '';
}
