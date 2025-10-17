---
title: '(My way of) Running Jobs on Alvis'
date: 2025-06-27
permalink: /posts/2025/06/runnin-jobs-on-alvis/
tags:
  - cluster
  - slurm
  - containers
  - jupyter notebooks
  - alvis
---

This post describes how to run jobs on Alvis, the HPC cluster at Chalmers University of Technology, and how to run a Jupyter Notebooks from a container.

There two main schools of thought on how to run jobs on Alvis:

- one using the `module` system and virtual environments
- the other using containers.

I reccommend using virtual environments and limit to only use pip-installed packages when possible, as it allows for easier sharing of code and environments with others, for example via `requirements.txt` files (`pip freeze > requirements.txt` to create it, and `pip install -r requirements.txt` to install the packages from it).

Using containers allows for better local reproducibility and isolation of dependencies, but it might be more complex to set up initially and hard to share with others.
I reccommend using containers when the code to run has complex dependencies that are hard to install via `pip` or `conda`, for example non-Python libraries or packages that require specific system configurations.

## Using the Module System and Virtual Environments

To create and use a virtual environment on Alvis with Python 3.11, first `ssh` and login, then go the directory where to create the virtual environment and run:

```bash
module load Python/3.11.3-GCCcore-12.3.0
module load PyTorch/2.1.2-foss-2023a-CUDA-12.1.1

# NOTE: If you try to run the following command without pre-loading the above
# modules, Alvis will complain and tell that python3 is not even an available
# command.
python3 -m venv my-env-name
```

The environment will be created at `my-env-name`.
To install packages, run the following:

```bash
source path/to/my/environment/my-env-name/bin/activate
pip install --upgrade pip
pip install jupyter
pip install <what you need>
pip install bitsandbytes
pip install optuna
pip install h5py
pip install optuna
pip install rdkit
pip install pynvml tqdm jsonargparse nltk rouge_score evaluate
pip install pandas tensorboard tabulate scikit-learn
pip install datasets
pip install tokenizers
pip install accelerate
pip install huggingface
pip install bitsandbytes
pip install trl
```

Once eveything is ready, one can "wrap" the above setup steps into a bash script, for example named `setup_environment.sh`, containing:

```bash
#!/bin/bash
# Load necessary modules
module load Python/3.11.3-GCCcore-12.3.0
module load PyTorch/2.1.2-foss-2023a-CUDA-12.1.1

# Source the virtual environment
source path/to/my/environment/my-env-name/bin/activate
```

The script can be run via the command:

```bash
source setup_environment.sh
```

One must use the `source` command, making the script executable is not enough.

### Running Jobs via Slurm

Setting up the modules and virtual environment, _i.e._, `source setup_environment.sh`, can directly be placed in sbatch script files, for example:

```bash
#!/bin/bash
#SBATCH --account=my-account-number
#SBATCH --partition=alvis
#SBATCH --gpus-per-node=T4:1
#SBATCH --job-name=my-awesom-job
#SBATCH --time=2:00:00

source setup_environment.sh

python my_python_script.py

deactivate
```

Alternatively, in a less concise way:

```bash
#!/bin/bash
#SBATCH --account=my-account-number
#SBATCH --partition=alvis
#SBATCH --gpus-per-node=T4:1
#SBATCH --job-name=my-awesom-job
#SBATCH --time=2:00:00

# Load Python modules
module load Python/3.11.3-GCCcore-12.3.0
module load PyTorch/2.1.2-foss-2023a-CUDA-12.1.1

# Activate environment
source path/to/my/environment/my-env-name/bin/activate

# Run my stuff
python my_python_script.py

# Deactivate the environment
deactivate
```

### Using Jupyter Notebooks

To run Jupyter Notebooks on Alvis using the module system and virtual environments, first create a virtual environment as described above, install Jupyter via `pip install jupyter`, and then run:

```bash
source setup_environment.sh
jupyter notebook --no-browser
```

Copy the link provided by Jupyter Notebook and provide that to your local browser to access the notebooks.

## The Containers Approach

The idea is to have a container that contains all the dependencies needed for running the code, and use that to develop code and run jobs on Alvis.

Very brutally speaking, a container is like a virtual machine, meaning that I can run "its terminal" and run commands inside it, but the code in it can access and interact with the host filesystem (_i.e._, the files on Alvis).

Alvis uses [Apptainer](https://apptainer.org/) for containerization.
Apptainer is the "manager" running the containers, but one can have different container _files_, each built in a different way (_e.g._, with different `pip`-installed packages).

### Create the Container

To create a container, Alvis already provides some starting points, which are available in `/apps/containers/Conda/`. For example, one can use the `miniconda-22.11.1.sif` file as a base image.
Below is an example of a content of a _recipe file_ (`container_file.def`) to create a "container file":

```bash
Bootstrap: localimage
From: /apps/containers/Conda/miniconda-22.11.1.sif
# NOTE: The line above can be modified to use a different base image if needed,
#       for example: "From <my/local/folders/container/file>.sif"

%post
    # Put all your installation commands here, all the following commands will
    # be executed when building the container. None of them are required, it's
    # just an example of how to install packages and libraries.
    apt-get -y update
    apt-get -y install git-lfs
    /opt/conda/bin/conda install -y pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia
    /opt/conda/bin/conda install -y -c huggingface transformers tokenizers datasets
    /opt/conda/bin/conda install -y -c conda-forge accelerate pandas evaluate tensorboard tabulate scikit-learn
    pip install pynvml tqdm jsonargparse nltk rouge_score  
    conda install -c conda-forge tabulate
    conda install -y -c conda-forge scikit-learn
    conda install -y -c anaconda scikit-learn
    pip install rdkit
    pip install -U "huggingface_hub[cli]"
    conda remove transformers -y
    pip install transformers
    conda remove datasets -y
    pip install datasets
    pip install evaluate
    pip install peft
    
    [...]
```

To build the container, one shall run the following command:

```bash
apptainer build <path/to/destination/container/file>.sif <path/to/recipe/file>.def
```

### Using Jupyter Notebooks on Alvis

Bash script (saved to, for example, `run_jupyter_in_apptainer.sh`) to run a Jupyter Notebook from a container:

```bash
#!/bin/bash

# Check if Apptainer path is provided
if [ "$#" -lt 1 ] || [ "$#" -gt 2 ]; then
    echo "Usage: $0 <path-to-apptainer-image> [path-to-work-directory]"
    exit 1
fi

# Path to the Apptainer image
IMAGE_PATH="$1"

# Optional path to the work directory
if [ -n "$2" ]; then
    WORK_DIR="$2"
    # Check if directory exists
    if [ ! -d "$WORK_DIR" ]; then
        echo "The specified directory does not exist: $WORK_DIR"
        exit 1
    fi
    # Change to the specified directory
    cd "$WORK_DIR"
fi

# Check if Apptainer is installed
if ! command -v apptainer &> /dev/null; then
    echo "Apptainer is not installed. Please install it to continue."
    exit 1
fi

# Run the Apptainer image with Jupyter Notebook
apptainer exec "$IMAGE_PATH" jupyter notebook --no-browser --ip=0.0.0.0 --port=8889 --allow-root
```

Example of usage: `./run_jupyter_in_apptainer.sh ./containers/container_file.sif`

It will output something like the following:

```
[ribes@alvis2-02 ~]$ ./run_jupyter_in_apptainer.sh ./containers/container_file.sif
[I 2025-03-27 09:21:33.125 ServerApp] jupyter_lsp | extension was successfully linked.
[I 2025-03-27 09:21:33.129 ServerApp] jupyter_server_terminals | extension was successfully linked.
[I 2025-03-27 09:21:33.133 ServerApp] jupyterlab | extension was successfully linked.
[I 2025-03-27 09:21:33.137 ServerApp] notebook | extension was successfully linked.
[I 2025-03-27 09:21:33.448 ServerApp] notebook_shim | extension was successfully linked.
[I 2025-03-27 09:21:33.469 ServerApp] notebook_shim | extension was successfully loaded.
[I 2025-03-27 09:21:33.471 ServerApp] jupyter_lsp | extension was successfully loaded.
[I 2025-03-27 09:21:33.472 ServerApp] jupyter_server_terminals | extension was successfully loaded.
[I 2025-03-27 09:21:33.474 LabApp] JupyterLab extension loaded from /opt/conda/lib/python3.10/site-packages/jupyterlab
[I 2025-03-27 09:21:33.474 LabApp] JupyterLab application directory is /opt/conda/share/jupyter/lab
[I 2025-03-27 09:21:33.474 LabApp] Extension Manager is 'pypi'.
[I 2025-03-27 09:21:33.483 ServerApp] jupyterlab | extension was successfully loaded.
[I 2025-03-27 09:21:33.486 ServerApp] notebook | extension was successfully loaded.
[I 2025-03-27 09:21:33.487 ServerApp] Serving notebooks from local directory: /cephyr/users/ribes/Alvis
[I 2025-03-27 09:21:33.487 ServerApp] Jupyter Server 2.14.2 is running at:
[I 2025-03-27 09:21:33.487 ServerApp] http://alvis2-02:8889/tree?token=d263b3a10fa6558d1f673a646128a5d847948f6972df27d8
[I 2025-03-27 09:21:33.487 ServerApp]     http://127.0.0.1:8889/tree?token=d263b3a10fa6558d1f673a646128a5d847948f6972df27d8
[I 2025-03-27 09:21:33.487 ServerApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
[C 2025-03-27 09:21:33.501 ServerApp] 
    
    To access the server, open this file in a browser:
        file:///cephyr/users/ribes/Alvis/.local/share/jupyter/runtime/jpserver-65940-open.html
    Or copy and paste one of these URLs:
        http://alvis2-02:8889/tree?token=d263b3a10fa6558d1f673a646128a5d847948f6972df27d8
        http://127.0.0.1:8889/tree?token=d263b3a10fa6558d1f673a646128a5d847948f6972df27d8
[I 2025-03-27 09:21:33.517 ServerApp] Skipped non-installed server(s): bash-language-server, dockerfile-language-server-nodejs, javascript-typescript-langserver, je
di-language-server, julia-language-server, pyright, python-language-server, python-lsp-server, r-languageserver, sql-language-server, texlab, typescript-language-se
rver, unified-language-server, vscode-css-languageserver-bin, vscode-html-languageserver-bin, vscode-json-languageserver-bin, yaml-language-server
```

In VSCode, with an open notebook, with the `Select kernel` button in the top-right corner, one can point to the existing running kernel by pasting the link that shows up when running the jupyter server.
In practice, look at the output for a link that looks something like this: `http://alvis2-02:8889/tree?token=d263b3a10fa6558d1f673a646128a5d847948f6972df27d8` (it's in the example above).

For having a jupyter notebook with GPU support, one shall create a session on Alvis on-demand, then open a terminal, and finally follow the same steps above.

### Running Jobs via Slurm

Example of sbatch script (CPU-only):

```bash
#!/usr/bin/env bash
#SBATCH -A NAISS2024-5-630 -p alvis
#SBATCH -N 1
#SBATCH -C NOGPU
#SBATCH --cpus-per-task=32
#SBATCH -t 0-2:00:00
#SBATCH -J "slurm-score-predictions"
#SBATCH -o slurm-score-predictions.log

cd $SLURM_SUBMIT_DIR
echo "Running score_predictions.py"

export PYTHONPATH=$PYTHONPATH:/my/local/dir/containing/code

apptainer exec ~/containers/container_file.sif python $SLURM_SUBMIT_DIR/scripts/score_predictions.py --num_proc=32 --skip_if_log_exists
```

Example of sbatch script with GPU:

```bash
#!/usr/bin/env bash
#SBATCH -N 1 --gpus-per-node=T4:1
#SBATCH -t 0-2:00:00
#SBATCH -J "slurm-predict-MyModel"
#SBATCH -o slurm-predict-MyModel.log  # Output log file

echo "Starting at `date`"
echo "Running on hosts: $SLURM_NODELIST"
echo "Running on $SLURM_NNODES nodes."
echo "Running $SLURM_NTASKS tasks."
echo "Job id is $SLURM_JOBID"
echo "Job submission directory is: $SLURM_SUBMIT_DIR"
cd $SLURM_SUBMIT_DIR

local_dir=my/local/dir/containing/code

# echo "-------------------------------------------------------------------------"
# apptainer exec ~/containers/container_file.sif accelerate env
# echo "-------------------------------------------------------------------------"

export PYTHONPATH=$PYTHONPATH:my/local/dir/containing/code/

apptainer exec ~/containers/container_file.sif python ${local_dir}/scripts/collect_llm_predictions.py \
    --model_name=MyModel \
    --batch_size=32 \
    --num_proc=16 \
    --eval_gen_strategies=true
```
