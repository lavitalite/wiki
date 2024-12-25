export default {
    paths() {
        return [
            { params: { pkg: 'foo' } },
            { params: { pkg: 'bar' } }
        ];
    }
};
/*
 const docsPath = path.resolve(__dirname, '..')
    const subdirs = fs.readdirSync(docsPath).filter(item => {
      const fullPath = path.join(docsPath, item)
      return fs.statSync(fullPath).isDirectory() && !item.startsWith('.')
    })

    return subdirs.map(subdir => ({
      params: { target: subdir },
    }))

*/ 
