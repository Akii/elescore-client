with (import <nixpkgs> {});
with (import (builtins.fetchTarball https://github.com/moretea/yarn2nix/archive/8df1cee02f53bbb58ec0479fad5cca6ee3def170.tar.gz) { inherit pkgs; });
mkYarnPackage {
  name = "elescore-client";
  src = ./.;
  packageJson = ./package.json;
  yarnLock = ./yarn.lock;
  yarnNix = ./elescore-client.nix;
  buildPhase = "yarn build";
  installPhase = "mv dist $out";
}
