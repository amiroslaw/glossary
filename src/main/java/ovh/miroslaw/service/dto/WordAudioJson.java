package ovh.miroslaw.service.dto;

public class WordAudioJson {
    private String fileUrl;

//    public WordAudioJson(String fileUrl) {
//        this.fileUrl = fileUrl;
//    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    @Override
    public String toString() {
        return "WordAudioJson{" +
            "fileUrl='" + fileUrl + '\'' +
            '}';
    }
}
