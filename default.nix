with (import <nixpkgs> {});
with (import (builtins.fetchTarball https://github.com/moretea/yarn2nix/archive/master.tar.gz) { inherit pkgs; });
rec {
  elescore-client = mkYarnPackage {
    name = "elescore-client";
    src = ./.;
    packageJson = ./package.json;
    yarnLock = ./yarn.lock;
    yarnNix = ./elescore-client.nix;
    buildPhase = "yarn build";
    installPhase = "mv dist $out";
  };
}